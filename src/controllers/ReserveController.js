import Reserve from '../models/Reserve';
import House from '../models/House';

class ReserveController {
  async index(req, res) {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({ user_id }).populate('house_id');

    return res.status(200).json(reserves);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);

    if (!house) {
      return res.status(400).json({ response: 'Casa não encontrada!' });
    }

    if (house.status !== true) {
      return res.status(400).json({ response: 'Casa não disponível!' });
    }

    if (String(house.user_id) === String(user_id)) {
      return res
        .status(401)
        .json({ response: 'Não é possível reservar uma casa que já é sua!' });
    }

    const reserve = await Reserve.create({
      date,
      user_id,
      house_id,
    });

    await reserve.populate('house_id').populate('user_id').execPopulate();
    return res.status(200).json(reserve);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({ _id: reserve_id });

    return res.status(200).json({ response: 'Reserva cancelada com sucesso!' });
  }
}

export default new ReserveController();
