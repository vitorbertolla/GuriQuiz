import styles from './Tela_Login.module.css'

export default function Login (){
        return(
            <div className={styles.containerLogin}>
                <h1 className={styles.title}>LOGIN</h1>
                <form className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>E-MAIL</label>
                        <input className={styles.input} type="email" />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>SENHA</label>
                        <input className={styles.input} type="password" placeholder='SUA SENHA' />
                    </div>
                <div className={styles.actions}>
                    <button className={styles.botao} type="submit">Entrar</button>
                    <button className={styles.botao} type="button">Acessar</button>
                </div>
                </form>
            </div>
        )
}