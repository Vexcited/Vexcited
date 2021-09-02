import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import reportWebVitals from './reportWebVitals';

// CSS
import './assets/style.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Error from './pages/Error';

// Routes and animations
function App () {
	const location = useLocation();
    
    // Transitions durations
    const transition = {
		duration: 0.3
    }
    
    // Transitions on global page
	const props = {
		initial: {
			opacity: 0
		},
		animate: {
			opacity: 1,
			transition
		},
		exit: {
			opacity: 0,
			transition
		}
    }
    
	return(
		<AnimatePresence exitBeforeEnter initial={false}>
			<Switch location={location} key={location.pathname}>
				<Route exact path="/" render={() => (
					<motion.div {...props}><Home /></motion.div>
				)} />

				<Route path="/projects" render={() => (
					<motion.div {...props}><Projects /></motion.div>
				)} />

				<Route path="/about"  render={() => (
					<motion.div {...props}><About /></motion.div>
				)} />

                <Route path="/*"  render={() => (
					<motion.div {...props}><Error /></motion.div>
				)} />
			</Switch>
		</AnimatePresence>
	);
}

// Rendering
ReactDOM.render(
  <React.StrictMode>
	<Router>
   		<App />
	</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
