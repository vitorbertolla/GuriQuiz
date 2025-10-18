import styles from './Tela_Cadastro.module.css'

export default function Cadastro() {

    return (
        <div className={styles.container}>
            <div className={styles.bloco}>
                <h1 className={styles.title}>CADASTRO</h1>
                <form className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>NICK</label>
                        <input className={styles.input} type="text" />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>E-MAIL</label>
                        <input className={styles.input} type="email" />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>SENHA</label>
                        <input className={styles.input} type="password" placeholder='SUA SENHA' />
                        <input className={styles.input} type="password" placeholder='CONFIRME SUA SENHA' />
                    </div>
                    <div className={styles.actions}>
                        <button type="submit"><img className={styles.botao} src="/images/botaoCadastrar.png" alt="" /></button>
                        <button type="submit"><img className={styles.botao} src="/images/googleCadastrar.png" alt="" /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}