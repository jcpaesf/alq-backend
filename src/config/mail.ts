interface IMailConfig {
    driver: 'ethereal' | 'ses',
    defaults: {
        from: {
            email: string,
            name: string
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'alquimiadocoracao2020@gmail.com',
            name: 'Equipe Alquimia do Coração'
        }
    }
} as IMailConfig;