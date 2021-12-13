import React from "react";

export default function MainHero () {
	return (
		<section
			className="
        flex justify-center flex-col
        h-screen gap-6 px-6
        bg-separator-mainHero
        bg-no-repeat bg-bottom
      "
		>
			<div>
				<p>👋 Bienvenue, je m'appelle</p>
				<h1 className="text-4xl font-bold">
        Mikkel RINGAUD
				</h1>
				<span className="text-sm text-opacity-80
      ">... alias Vexcited.</span>
			</div>

			<p className="text-white text-opacity-60">
        Je suis étudiant et développeur web full-stack.
        Étant passionné de développement web et de musique, mon projet actuellement en cours est <a className="text-blue text-opacity-60 hover:text-opacity-100 focus:text-opacity-100 transition-colors" href="https://github.com/Vexcited/lpadder">lpadder</a>.
			</p>

			<div>
				<a href="https://instagram.com/vexcitedoff" target="_blank" className="px-5 py-3 text-blue hover:bg-blue focus:bg-blue inline-block hover:bg-opacity-20 focus:bg-opacity-20 bg-transparent border-blue border-2 rounded transition-colors" rel="noreferrer">Mes cours Instagram</a>
			</div>
		</section>
	);
}
