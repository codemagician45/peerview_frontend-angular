/**
 * This folder `classes` would include
 * Component classes which doesn't have
 * any angular anotations.
 */

/**
 * User will include information of the user
 * which generally the result from getUserProfile
 * We are doing this so that we are removing extra
 * overhead to another components; thus any change of the user
 * the user classes should be updated as well; please see
 * the static classes on how to update the user
 */
export * from './user';
