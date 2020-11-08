/*
    Método: index, show, update, store, destroy

    index: Listagem de sessões
    store: Criar uma sessão
    show: Listar apenas UMA sessão
    update: Alterar alguma sessão
    destroy: Deletar alguma sessão
 */

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ response: 'Falha na validação!' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
      return res.status(201).json(user);
    }

    // return res.status(200).json({ response: 'Usuário já cadastrado!' });
    return res.status(200).json(user);
  }
}

export default new SessionController();
