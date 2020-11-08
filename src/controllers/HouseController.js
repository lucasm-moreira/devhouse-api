import * as Yup from 'yup';
import House from '../models/House';
import User from '../models/User';

class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });

    return res.status(200).json(houses);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ response: 'Falha na validação!' });
    }

    const house = await House.create({
      user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.status(200).json(house);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { filename } = req.file;
    const { house_id } = req.params;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ response: 'Falha na validação!' });
    }

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (String(user._id) !== String(house.user_id)) {
      return res.status(401).json({ response: 'Não autorizado!' });
    }

    const houses = await House.updateOne(
      { _id: house_id },
      {
        user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );

    return res
      .status(200)
      .json({ response: 'Casa editada com sucesso!', data: houses });
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const house = await House.findById(house_id);

    if (String(user_id) !== String(house.user_id)) {
      return res.status(401).json({ response: 'Não autorizado!' });
    }

    await House.findByIdAndDelete({ _id: house_id });

    return res.status(200).json({ response: 'Casa deletada com sucesso!' });
  }
}

export default new HouseController();
