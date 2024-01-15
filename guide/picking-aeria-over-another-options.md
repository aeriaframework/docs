# Picking Aeria over another options

## Introduction

Aeria has a lot of new features to offer to the JS/TS communities.

## Picking Aeria over Express + Mongoose (or similar)

We removed more than a million dependent lines of code from Mongoose and Hapi, which we used during early stages of development, to make code more fast and cohesive.

We choose to not put abstractions on top of MongoDB, offering direct access to it instead, in order to improve the performance and reduce maintenance cost. Aeria's HTTP server is also much simpler -- there's no need of a plugin system, hooks, or anything of the sort. Instead, we just offer functions, and it is up to the user how to use them.

## Picking Aeria over AdminJS

Whereas AdminJS is a pluggable dashboard meant to be used on top of existing JS applications, Aeria is a much better option for applications being built from scratch.

## Picking Aeria over headless CMS

Aeria offers end-to-end strong typing, and that alone is a strong reason to consider chosing it over popular headless content management systems, like Strapi, and Pocketbase.

Another good reason is that Aeria is much simpler to extend. It is not a graphical interface, it is just code.


