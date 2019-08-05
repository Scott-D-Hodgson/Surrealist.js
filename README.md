<h1 align="center">Surrealist.js</h1>

<p align="center">
A JavaScript library to make animating the reordering of a list, surreal.
</p>

<p align="center">
<a href="https://david-dm.org/Scott-D-Hodgson/Surrealist.js#info=dependencies"><img src="https://david-dm.org/Scott-D-Hodgson/Surrealist.js/status.svg" alt="Dependency Status"/>
<a href="https://david-dm.org/Scott-D-Hodgson/Surrealist.js#info=devDependencies"><img src="https://david-dm.org/Scott-D-Hodgson/Surrealist.js/dev-status.svg"/>
</p>

## Documentation

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Integration](#integration)
- [Usage](#usage)
  - [Create Unordered List](#create-unordered-list)
  - [List Binding](#list-binding)
- [Functions](#functions)
  - [Shuffle Items](#shuffle-items)
  - [Swap Items](#swap-items)
  - [Top to Bottom](#top-to-bottom)
  - [Bottom to Top](#bottom-to-top)
  - [Remove (by IDs)](#remove-by-ids)
- [License](#license)

## Introduction

The Surrealist.js library is the result of a search to find a way to animate the order of items in a HTML document's UL tag such that items would "slide" into their new positions.

After several Googles, the [Flip Move React](https://github.com/joshwcomeau/react-flip-move) library was discovered, written by [Joshua Comeau](https://github.com/joshwcomeau), and referencing several [working examples](http://joshwcomeau.github.io/react-flip-move/examples/#/shuffle?_k=g0a42t) that provided the visual effect sought.  This was the right concept, however was designed to work with React, and the sought for solution was just a pure JavaScript library.

Following the breadcrumbs led to the [Medium](https://medium.com) article [Animating the Unanimatable](https://medium.com/developers-writing/animating-the-unanimatable-1346a5aab3cd), also written by [Joshua Comeau](https://medium.com/@joshuawcomeau), where he explained how the animation trick worked through transitions and calculating the old/new positions through the FLIP technique, described by Google’s Paul Lewis, and is an acronym for First, Last, Inverse, Play steps:

- Calculate the **F**irst position.
- Calculate the **L**ast position.
- **I**nvert the positions
- **P**lay the animation

With this insight, the Surrealist.js library was able to written to provide a JavaScript-only implementation to animate a list of items.

## Getting Started

### Installation

You can download the latest version of Surrealist.js from the GitHub releases.

### Integration

Surrealist.js can be integrated with plain JavaScript through referencing via the **Script Tag**.

    <script src="path/to/surrealistjs/dist/Surrealist.js"></script>

## Usage

### Create Unordered List

Add an Unordered List (UL) to the source of the markdown, identified by an **id** attribute value for reference.

    <ul id='list'></ul>

### Attaching to List

Instruct Surrealist.js to manage the animations of the Unordered List (UL).

    <script>
      Surrealist('list', {});
    </script>

## Functions

### Shuffle Items

Use the suffle method to instruct Surrealist.js to randomize the sequence of the items and animate them into the new positions.

    Surrealist.Shuffle('list');

### Swap Items

Use the swap method to instruct Surrealist.js to inverse the positions of two items in the list.

    Surrealist.Swap('list', '2', '8');

### Top to Bottom

Use the top-to-bottom method to instruct Surrealist.js to move the top item in the list to the last position, shifting all others up by one position.

    Surrealist.TopToBottom('list');

### Bottom to Top

Use the bottom-to-top method to instruct Surrealist.js to move the last item in the list to the first position, shifting all others down by one position.

    Surrealist.BottomToTop('list');

### Remove (by IDs)

To remove items from the list by their IDs, use the remove-by-ids method to remove the items and shifting all others into the spaces created in their absence.

    Surrealist.RemoveByIds('list', ['5', '2', '7']);

## License

Surrealist.js is available under the [MIT license](https://opensource.org/licenses/MIT).