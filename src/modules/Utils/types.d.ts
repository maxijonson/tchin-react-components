/**
 * A pretty verbose type. If T extends "Extends", then use "True", else, use "False"
 */
declare type If<T, Extends, True, False> = T extends Extends ? True : False;
