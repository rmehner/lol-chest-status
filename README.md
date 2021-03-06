# League of Legends chest status

[![Build Status](https://travis-ci.org/rmehner/lol-chest-status.svg?branch=master)](https://travis-ci.org/rmehner/lol-chest-status)
[![Greenkeeper badge](https://badges.greenkeeper.io/rmehner/lol-chest-status.svg)](https://greenkeeper.io/)

## Check if you can get a chest with that champion

My friends and me, we mostly play ARAM and we sometimes want to know if we can
get a chest with a champion and the official client does not show this if you're
in the champion select screen. This scratches our own itch. It might scratch yours.

This is *not* beautiful and the result of a quick hack, don't use it in production.
No frameworks have been harmed making this.

## Requirements

* Node 8.0.0 (we need this sweet async/await)
* npm 5+ is recommended for package-lock.json support.
* A Riot API key (https://developer.riotgames.com)
* The frontend needs a modern browser with support for arrow functions and
`<marquee>`.

## Installation

* `git clone https://github.com/rmehner/lol-chest-status.git`
* `cd lol-chest-status`
* `npm install`
* create `.env` file (see `.env.example`) with your Riot API key in there

## Start

* run `npm start` in the project folder
* point your browser to `http://localhost:3000`

## Legal

This project is not endorsed by Riot Games. League of Legends and Riot Games are trademarks, service marks, and registered trademarks of Riot Games, Inc.
