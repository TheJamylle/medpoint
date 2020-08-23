import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{

    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({ 
            where: { date }
         })

        return findAppointment || null;
    };
}

export default AppointmentRepository;