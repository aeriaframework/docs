# Picking Aeria over another options

## Introduction

Yes, Aeria is yet another JavaScript framework. But it is far from being just another framework. Aeria offers code ergonomy at it's peak. The greatest advantage Aeria has to offer is: you write less, you get more (and more safely).


## Picking Aeria over Express + Mongoose (or similar)

We removed more than a million dependent lines of code from Mongoose and Hapi, which we used during early stages of development, to make code more fast, cohesive, and strongely typed. Some dependencies just stood in the way of how Aeria traverses types throughout functions.

We also choose to not build abstractions on top of MongoDB. You want to do something on the database, you do it directly, without the need of hooks, getters, virtuals, a plugging system, etc, like Mongoose has. Resolution of reference IDs to documents and cascading removal of nested documents are handled internally when you call the built-in CRUD functions.


## Picking Aeria over AdminJS

AdminJS is very good at being a dashboard system puggable to existing NodeJS applications. When building from scratch, however, performance and maintenance cost are things to consider. AdminJS requires much more boilerplate to set up a single feature, while Aeria has it all declarabe in a single file.

Also, when you are adding a feature to an AdminJS project, you must choose between adding the feature in the host webserver or in AdminJS itself, as they are two separate things. Aeria saves you this hassle: you have all your business logic reunited in a single source of truth.

## Picking Aeria over headless CMS

If you got a big SQL dataset you want to build a dashboard on top of it without adding heavy business logic, headless CMS is probably for you. If however your application will depend on heavy business logic, or you just don't want to depend on a graphical interface or on a API hosted by third parties, you may want to consider using something that is just code and you have total control over it.

Another big reason someone should consider picking Aeria over some headless CMS is end-to-end typing. Aeria is intrinsically strongly typed -- 100% of it's code is made in TypeScript, so that makes it a lot easier to get the typing working in the frontend (see [Aeria SDK](/aeria-sdk/)).

