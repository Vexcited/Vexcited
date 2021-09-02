import { Link } from 'react-router-dom';
import { Grid, Container, Card, CardContent, CardActions, Typography, Fab, Paper, LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ArrowBack, GitHub, YouTube, Instagram, Email } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	pageTitle: {
		color: "#ECEFF4",
		textAlign: "center",
        paddingTop: ".75em",
        fontFamily: "\"Poppins\", sans-serif",
        fontWeight: 600,
		letterSpacing: ".05em"
	},
    fab: {
		backgroundColor: "#88C0D0",
		color: "#ECEFF4",
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		boxShadow: "none",

		"&:hover": {
			background: '#4C566A'
		}
    },
    cardMe: {
        maxWidth: 500,
        margin: "1em auto 0 auto",
        backgroundColor: "#ECEFF4",

        "& h2": {
            fontFamily: "\"Poppins\", sans-serif"
        }
    },
    cardMeTitle: {
        fontSize: 14
    },
    cardMeName: {
        fontWeight: 600
    },
    cardMeBottom: {
        marginBottom: 12,
        fontWeight: 400
    },
    paperSkills: {
        padding: "1em",
        backgroundColor: "#ECEFF4",
        maxWidth: 400,
        margin: "0 auto",
        height: "100%"
    },
    paperSkillName: {
        fontFamily: "\"Poppins\", sans-serif",
        fontWeight: 600,
        marginBottom: 12,
        color: "#2E3440"
    },
    cardMeContact: {
        paddingLeft: 16,

        "& a": {
            color: "#5e81ac",
            transition: "color .2s",

            "&:hover": {
                color: "#88C0D0"
            }
        }
    }
}));

const CustomLinearProgress = withStyles((theme) => ({
    root: {
      height: 5,
      borderRadius: 2,
      marginBottom: 4
    },
    colorPrimary: {
      backgroundColor: "#D8DEE9"
    },
    bar: {
      backgroundColor: "#88C0D0",
      borderRadius: 2
    }
}))(LinearProgress);

export default function About () {    
    const classes = useStyles();
    const skills = [
        [
            {
                name: "JavaScript",
                progress: 80
            },
            {
                name: "Node.js",
                progress: 60
            }
        ],
        [
            {
                name: "Express",
                progress: 70
            },
            {
                name: "MongoDB (w/Mongoose)",
                progress: 55
            }
        ],
        [
            {
                name: "React",
                progress: 30
            },
            {
                name: "Material UI (w/React)",
                progress: 20
            }
        ],
        [
            {
                name: "PHP (7.4)",
                progress: 60
            },
            {
                name: "MySQL (w/PHP OOP)",
                progress: 80
            }
        ],
        [
            {
                name: "HTML/CSS",
                progress: 60
            },
            {
                name: "Boostrap || Bulma",
                progress: 55
            }
        ]
    ]

    return (
        <Container>
            <Typography variant="h4" className={classes.pageTitle}>
                à propos
			</Typography>

            <Card className={classes.cardMe}>
                <CardContent>
                    <Typography className={classes.cardMeTitle} color="textSecondary" gutterBottom>
                        À propos
                    </Typography>
                    <Typography className={classes.cardMeName} variant="h5" component="h2">
                        Mikkel RINGAUD
                    </Typography>
                    <Typography className={classes.cardMeBottom} color="textSecondary">
                        Lycéen • Développeur Web Backend
                    </Typography>
                    <Typography variant="body2" component="p">
                        Lycéen au Lycée Turgot à Limoges (87000). 15 ans, passionné de développement web et de musique.
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardMeContact}>
                    <a href="mailto:vexitofficial@gmail.com"><Email fontSize="small" /></a>
                    <a rel="noreferrer" target="_blank" href="https://www.github.com/vexcited"><GitHub fontSize="small" /></a>
                    <a rel="noreferrer" target="_blank" href="https://www.instagram.com/vexcitedoff"><Instagram fontSize="small" /></a>
                    <a rel="noreferrer" target="_blank" href="https://www.youtube.com/channel/UCFJ__5HnvYEyaVkNuvUy4NQ"><YouTube fontSize="small" /></a>
                </CardActions>
            </Card>

            <div style={{height: ".5em"}}></div>

            <Grid 
                container
                spacing={1}
                justify="center"
                direction="row"
            >
                {skills.map((line, key) => (
                    <Grid key={key}
                        container item
                        xs={12} sm={12}
                        spacing={1}
                        direction="row"
                        alignItems="stretch"
                    >
                        {line.map((skill, key) => (
                            <Grid key={key}
                                item
                                xs={12} sm={6}
                            >
                                <Paper className={classes.paperSkills}>
                                    <Typography variant="h5" component="h4" className={classes.paperSkillName}>
                                        {skill.name}
                                    </Typography>
                                    <CustomLinearProgress variant="determinate" value={skill.progress} />
                                    <Typography variant="body2" color="textSecondary">
                                        {skill.progress}%
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>

            <div style={{height: "3em"}}></div>

            <Link to="/">
				<Fab className={classes.fab} aria-label="back">
					<ArrowBack />
				</Fab>
			</Link>
        </Container>
    )
}