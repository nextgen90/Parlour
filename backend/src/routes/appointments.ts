import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create an appointment
router.post('/', async (req, res) => {
  const { name, phone, date, serviceName, notes } = req.body;
  try {
    // 1. Find or create the user using a dummy email if none exists
    const email = phone ? `${phone.replace(/\D/g, '')}@example.com` : `guest_${Date.now()}@example.com`;
    
    let user = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone: phone || '' }] }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || 'Guest User',
          phone,
          email,
          passwordHash: 'dummy_hash'
        }
      });
    }

    // 2. Find or create the service
    let service = await prisma.service.findFirst({
      where: { name: serviceName }
    });

    if (!service) {
      service = await prisma.service.create({
        data: {
          name: serviceName || 'Custom Service',
          description: 'Auto-generated service',
          price: 0,
          duration: 60,
          category: 'General'
        }
      });
    }

    // 3. Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        notes,
        serviceId: service.id,
        userId: user.id
      }
    });
    res.json(appointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get appointments for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.params.userId },
      include: { service: true }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Fetch appointments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
