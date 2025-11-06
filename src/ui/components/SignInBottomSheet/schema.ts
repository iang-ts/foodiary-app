import z from 'zod';

export const signInSchema = z.object({
  email: z.email('Informe um e-mail válido.'),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
});

export type SignInSchema = z.infer<typeof signInSchema>;
