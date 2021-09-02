import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/logo.svg';

// Style
const useStyles = makeStyles((theme) => ({
    main: {
        textAlign: "center",
        verticalAlign: "middle",
        position: "absolute",

        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        
        "& img": {
            height: "12em !important",
            width: "10em !important"
        },
        "& p": {
            fontFamily: "\"Poppins\", sans-serif",

            "& a": {
                textDecoration: "none",
                transition: "all .2s",
                color: "#ECEFF4",
                letterSpacing: ".15em",

                "&:hover": {
                    color: "#88c0d0"
                }
            }
        }
    }
}))

// Page
export default function Home () {
    const classes = useStyles();

    return (
        <Container>
            <div className={classes.main}>
                <img src={Logo} alt="Vexcited's logo." />
                <p>
                    <Link to="/projects">projets</Link> <br />
                    <Link to="/about">à propos</Link>
                </p>
            </div>
        </Container>
    );
}