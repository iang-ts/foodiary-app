import { Gender } from '@app/types/Gender';
import z from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(1, 'Informe seu nome'),
  birthDate: z.date(),
  height: z.string().min(1, 'Informe sua altura'),
  weight: z.string().min(1, 'Informe seu peso'),
  gender: z.enum(Gender),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
