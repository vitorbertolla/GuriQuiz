import styles from './Tela_Login.module.css'

export default function Login (){
        return(
            <div className={styles.container}>
                <div className={styles.bloco}>
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
                        <button type="submit"><img className={styles.botao} src="/images/botaoEntrar.png" alt="" /></button>
                        <button type="button"><img className={styles.botao} src="/images/googleAcessar.png" alt="" /></button>
                    </div>
                    </form>
                </div>
            </div>
        )
}