import styles from '../styles/home.module.scss'

export function SignIn(){
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmitLogin} className={styles.form}>
                <img src="./logo.png" alt="" />
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Usuário" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">ENTRAR</button>

            </form>
            <span>
                {/* <Link href="/"> */}
                    <a href="/" onClick={() => handleToogleLogin(false)}>Cadastre-se</a>
                {/* </Link> */}
            </span>
        </div>
    )
}