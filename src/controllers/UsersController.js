const { hash } = require('bcryptjs')

const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const checkUserExists = await knex('users').where({ email });

    if (checkUserExists.length > 0) {
      throw new AppError('O e-mail já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({ name, email, password: hashedPassword });

    return res.status(201).json();
  }
}

module.exports = UsersController