# DoView Boards

**Draft repository, work in progress. Not yet stable.** 2026-03-29.

This repository sets out an early minimum core specification and reference materials for **DoView Boards**.

## What are DoView Boards?

DoView Boards are drill-down visual planning and coordination boards based on **This→Then** causal logic. They have been used for planning and outcomes work in thousands of instances. Their utility and usability have been progressively optimized by Dr Paul Duignan and others using them for planning, coordination, alignment, implementation, performance measurement, delegation/contracting and evaluation. The DoView legacy app, developed to draw DoView Boards (DoView Strategy/Outcomes diagrams) was used in over 55 countries and won Gartner Cool Vendor recognition (the Gartner citation described the approach as 'Sometimes simplicity and elegance define use'). This captures the vision behind the development of DoView Boards. The boards can be used for ordinary planning, organisational strategy, project coordination, human-AI coordination, and more. Experimentally, they may prove useful for coordinating AI inter-agent activity. 

DoView Boards can potentially provide a GUI-type interface for humans using AI systems by providing a visual artifact to structure how humans interact with, coordinate, control and improve agentic systems. This is based on the belief that **a GUI interface is more efficient than just using text chat with AI systems**.

The value of DoView Boards is not just that they are visual, but that they structure interaction around the relevant underlying This→Then logic. This is the logic of what must happen for action in the world to produce desired outcomes. This makes them a particularly efficient way of interacting with AI when the aim is to not merely generate text, but to inform, guide, coordinate, improve, or carry out real-world action. That action may be action a human is undertaking directly, information a human wants from an AI, code that a human wants an AI system to produce, or actions that a human wants an AI agents to carry out in digital or physical environments.


## Practical starting point for developers, experimenters and others

This repository is intended as a practical starting point for anyone who wants to experiment with, understand, generate, implement, or extend DoView Boards. DoView Boards and the wider DoView Planning system can be used by anyone in any context as long as they acknowledge and clearly indicate they are using DoView Boards.  

## What is in this repository

When finished, this repository will contain:

- a short introduction to DoView Boards
- a **minimum core specification for a DoView Board**
- an example prompt for an AI system (in this case Claude)
- an example (reference) **JavaScript engine for creating DoView Boards**
- a ChatGPT 5.2 prompt that will produce a drill-down PowerPoint version of a DoView Board. 
- examples of HTML, PowerPoint and PDF boards
- the DoView legacy app for download
- the source code for the DoView legacy app.

## Current status

This repository is an early draft.

**The minimum spec, prompts, engine, examples, and implementation guidance may change**. The aim at this stage is to make the core idea visible and usable, not to freeze the final form.

## What a DoView Board is

A DoView Board is a structured visual board that:

- shows causal logic from left to right.
- uses **This→Then** logic explicitly or implicitly.
- uses boxes written mainly as outcomes or achieved states rather than processes (e.g. 'completed X' rather than 'completing X').
- uses columns to communicate causal or dependency stages.
- breaks a board up into subpages that are meaningful to humans and of a size that a human can quickly parse. This means the user can easily get a helicopter view, drill down for more detail, and immediately return to the overview.
- is constructed so that the boxes on any subpage and their causal flow are based on the logical 'This-Then' structure of the underlying domain, rather than being a repeated template (due to how AI functions, AI systems have to be actively reminded not to just use a repetitive stereotyped number of boxes and columns on subpages).
- separates measurement from statements of steps or outcomes.
- has a human-optimized version for usability and low cognitive load.
- may have a companion AI-optimised version that can contain more information.

A DoView Board may be interactive or non-interactive. It may be implemented in HTML, PowerPoint, PDF, or other formats (such as the DoView legacy app file format and XML file format saved by it), provided the core DoView Board structure is preserved.

## This repository and the current engine approach

For non-technical readers: in the current HTML version, a DoView Board consists of two parts. One part is the reusable engine, which handles the visual layout, interaction, saving, downloading, chat panel, and other general behaviour. The other part is the board content itself, which defines the actual pages, boxes, outcomes, and sources for a particular board.

For developers, this means that the AI or author supplies only the board definition, which is then passed into the engine like this:

```javascript
DoView.init({
  title: "Board Title",
  slug: "board_slug",
  subpages: [
    // ...
  ],
  finalOutcomes: [
    // ...
  ],
  sources: [
    // optional
  ],
  savedState: null
});
