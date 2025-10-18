import styles from './Tela_Cadastro.module.css'

export default function Cadastro() {

    return (
        <div className={styles.containerCadastro}>
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
                    <button className={styles.botao} type="submit">CADASTRAR</button>
                    <button className={styles.botao} type="button">LOGIN</button>
                </div>
            </form>
        </div>
    )
}