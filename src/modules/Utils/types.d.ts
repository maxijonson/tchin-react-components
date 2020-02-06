/**
 * If T is NonNullable, then T is used. Otherwise, it means that the type is U.
 * Optionnaly, specify V to check as the NonNullable type for T.
 * This can be useful when T in a case where T is "string | undefined":
 *
 * @example See Form IUseFormReturnType
 */
declare type ExistsOr<T, U, V = T> = T extends NonNullable<V> ? T : U;
