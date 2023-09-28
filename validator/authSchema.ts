import vine from "@vinejs/vine"



export const signupSchema = vine.object({
    username: vine.string().minLength(2).maxLength(50),
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(8)
      .maxLength(32)
      .confirmed()
  })
  