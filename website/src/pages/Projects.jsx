import { Container, Card, CardContent, CardActions, Button, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	pageTitle: {
		color: "#ECEFF4",
		textAlign: "center",
		paddingTop: ".45em",
		fontWeight: 600,
		letterSpacing: ".05em"
	},
	card: {
		maxWidth: 600,
		margin: "1em auto 0 auto",
		backgroundColor: "#ECEFF4"
	},
	cardContent: {
		"& h4": {
			fontWeight: 300,
			fontSize: 14
		},
		"& h2": {
			fontWeight: 500
		},
		"& p": {
			fontWeight: 400,
			fontSize: 16
		}
	},
	buttonFilled: {
		background: "#88C0D0",
		color: "#ECEFF4",
		borderRadius: 2,

		"&:hover": {
			background: '#4C566A'
		}
	},
	buttonOutlined: {
		border: "1px solid #88C0D0",
		color: "#88C0D0"
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
	}
}));

export default function Projects () {
	const classes = useStyles();

	const projects = [
		{
			type: "Projet scolaire",
			name: "OneTwoTrie",
			description: "Application web pour mieux recycler ses déchets !",
			buttons: [
				{
					name: "Application",
					attributes: {
						href: "https://vexcited.github.io/onetwotrie",
						className: classes.buttonFilled,
						variant: "contained",
						disableElevation: true
					}
				},
				{
					name: "API",
					attributes: {
						href: "https://api.vexcited.ml/onetwotrie/",
						variant: "outlined",
						className: classes.buttonOutlined
					}
				}
			]
		},
		{
			type: "Outil, Musique",
			name: "lpadder",
			description : "Jouer des launchpad covers depuis son navigateur web.",
			buttons: [
				{
					name: "Application",
					attributes: {
						className: classes.buttonFilled,
						variant: "contained",
						disableElevation: true,
						href: "https://vexcited.github.io/lpadder-react"
					}
				}
			]
		},
		{
			type: "Outil",
			name: "Playlist Converter",
			description: "Permet de convertir vos playlists entre plusieurs platformes. Pas encore disponible !",
			buttons: [
				{
					name: "Application",
					attributes: {
						className: classes.buttonFilled,
						variant: "contained",
						disableElevation: true,
						href: "https://vexcited.github.io/playlist-converter"
					}
				}
			]
		}
	];

    return (
		<Container>
			<h1 className={classes.pageTitle}>
				projets
			</h1>

			{projects.map((item, key) => (
				<Card className={classes.card} key={key}>
					<CardContent className={classes.cardContent}>
						<h4>{item.type}</h4>
						<h2>{item.name}</h2>
						<p>{item.description}</p>
					</CardContent>
					<CardActions>
						{item.buttons.map((button, key) =>					 
							<Button key={key} size="small" {...button.attributes}>
								{button.name}
							</Button>
						)}
					</CardActions>
				</Card>
			))}

			<div style={{height: "3em"}}></div>

			<Link to="/">
				<Fab className={classes.fab} aria-label="back">
					<ArrowBack />
				</Fab>
			</Link>
		</Container>	
    );
}