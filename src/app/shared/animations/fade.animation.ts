import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeUpTrigger = trigger("fadeUp", [
    state("void", style({
        transform: "translateY(100%)"
    })),
    transition(":enter", [
        animate("1s ease-in-out")
    ]),
    transition(":leave", [
        animate(".5s ease-in-out")
    ])
]);