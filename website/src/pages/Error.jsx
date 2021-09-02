import { Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        textAlign: "center",
        verticalAlign: "middle",
        position: "absolute",

        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        "& h2": {
            color: "#D8DEE9",
            fontWeight: 500,
            padding: "1em",
            fontFamily: "\"Poppins\", sans-serif"
        },

        "& a": {
            textDecoration: "none",
            "& button": {
                transition: "all .2s",
                color: "#88C0D0",
                borderColor: "#88C0D0",
                letterSpacing: ".15em",
                
                "&:hover": {
                    color: "#5E81AC",
                    borderColor: "#5E81AC"
                }
            },
        }
    }

}));

export default function Error () {
    const classes = useStyles();

    return (
        <Container>
            <div className={classes.main}>
                <h2>erreur.</h2>
                <Link to="/">
                    <Button variant="outlined">
                        Retourner à l'accueil
                    </Button>
                </Link>
            </div>
        </Container>
    );
}