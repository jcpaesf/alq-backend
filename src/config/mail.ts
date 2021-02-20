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
            email: 'atendimento@alquimiadocoracao.com.br',
            name: 'Equipe Alquimia do Coração'
        }
    }
} as IMailConfig;