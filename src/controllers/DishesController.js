const fs = require('fs')
const path = require('path')

const { UPLOADS_FOLDER, TMP_FOLDER } = require('../configs/upload')
const knex = require('../database/knex')

class DishesController {
  async index(req, res) {
    const { search } = req.query
    
    let allDishes;

    if(search == '') {
      allDishes = await knex('dishes')
        .select([ 'id', 'name', 'img', 'type', 'price', 'description' ])
    } else {
      let findIngredient
      let findDish

      findIngredient = await knex('ingredients')
        .select([ 'dishes.id', 'dishes.name', 'dishes.img', 'dishes.type', 'dishes.price', 'dishes.description' ])
        .whereLike('ingredients.name', `%${search}%`)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')

      findDish = await knex('dishes')
        .select([ 'id', 'name', 'img', 'type', 'price', 'description' ])
        .whereLike('name', `%${search}%`)

      const findAll = findIngredient.concat(findDish)

      allDishes = findAll.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null))

      console.log(allDishes)
    }

    return res.json(allDishes)
  }

  async show(req, res) {
    const { id } = req.params

    const dish = await knex('dishes').where({ id: id }).first()

    const ingredients = await knex('ingredients').where({ dish_id: id }).select([ 'name' ])
    const arrayIngredients = []

    for (let key in ingredients) {
      arrayIngredients.push(ingredients[key].name);
    }

    const completeDish = {
      id: dish.id,
      name: dish.name,
      img: dish.img,
      type: dish.type,
      ingredients: arrayIngredients,
      price: dish.price,
      description: dish.description
    }

    return res.json(completeDish)
  }

  async create(req, res) {
    const { name, type, price, description, ingredients } = req.body;
    const user_id = req.user.id

    const [id] = await knex('dishes').insert({
      user_id,
      name,
      type,
      price,
      description
    })

    const dishIngredients = await ingredients.map(name => {
      return {
        dish_id: id,
        name
      }
    })  
    
    await knex('ingredients').insert(dishIngredients)
    
    res.json({id: id})
  }

  async update(req, res) {
    const { name, type, price, description, ingredients } = req.body
    const { id } = req.params

    const dish = await knex('dishes').where({ id: id }).first()

    dish.name = name ?? dish.name
    dish.type = type ?? dish.type
    dish.price = price ?? dish.price
    dish.description = description ?? dish.description
    dish.updated_at = new Date()

    await knex('dishes').update(dish).where({ id: id })

    await knex('ingredients').delete().where({ dish_id: id })

    const dishIngredients = await ingredients.map(name => {
      return {
        dish_id: id,
        name
      }
    })  
    
    await knex('ingredients').insert(dishIngredients)

    return res.json()
  }

  async delete(req, res) {
    const { id } = req.params;

    const dish = await knex('dishes').where({ id: id }).first()

    if (dish.img) {
      const filePath = path.resolve(UPLOADS_FOLDER, dish.img)

      try {
        await fs.promises.stat(filePath)
      } catch (error) {
        return error;
      }

      await fs.promises.unlink(filePath)
    }

    await knex('dishes').where({ id }).delete('PRAGMA foreign_keys = 1');

    return res.json();
  }

  async img(req, res) {
    const { id } = req.params
    const img = req.file.filename
    
    const getImg = await knex('dishes').where({ id: id }).first()

    if (getImg.img) {
      const filePath = path.resolve(UPLOADS_FOLDER, getImg.img)

      try {
        await fs.promises.stat(filePath)
      } catch (error) {
        return error;
      }

      await fs.promises.unlink(filePath)
    }

    await fs.promises.rename(
      path.resolve(TMP_FOLDER, img),
      path.resolve(UPLOADS_FOLDER, img)
    )

    await knex('dishes').where({ id: id }).update({ img: img })
    
    return res.status(201).json()
  }
}

module.exports = DishesController