const apiUrl = process.env.NEXT_PUBLIC_API;

export const LOGIN = apiUrl + "/auth/login";
export const SIGNUP = apiUrl + "/auth/register";
export const GET_TOURNAMENT_BY_ID = apiUrl + "/tournaments/getById";

export const GET_USER_DATA = apiUrl + "/user/profile/";
export const UPDATE_USER = apiUrl + "/user/update/";
export const CREATE_TEAM = apiUrl + "/teams/create";
export const GET_TEAM = apiUrl + "/teams/user/";
export const GET_TOURNAMNETS = apiUrl + "/tournaments/getAll";
export const JOIN_TEAM = apiUrl + "/teams/join/";
export const GET_INDIVIDUAL_TEAM = apiUrl + "/teams/";
export const DELETE_TEAM = apiUrl + "/teams/delete/";
export const REMOVE_PLAYER = apiUrl + "/teams/remove/";
export const INVITE_PLAYER = apiUrl + "/teams/invite/";
export const REGISTER_TEAM = apiUrl + "/tournaments/join/";
export const FORGOT_PASSWORD = apiUrl + "/auth/reset-password";
export const FORGOT_PASSWORD_CHANGE = apiUrl + "/verify/new-password";
export const GOOGLE_AUTH = apiUrl + "/auth/google";
export const FACEBOOK_AUTH = apiUrl + "/auth/facebook";
export const VERIFY_EMAIL = apiUrl + "/verify/email";
export const VERIFY_EMAIL_AGAIN = apiUrl + "/verify/email/again";
export const VERIFY_EMAIL_AGAIN_WITHOUT_AUTH = apiUrl + "/verify/email/againwithoutauth";
export const UPDATE_TEAM_DATA = apiUrl + "/teams/update";
export const UNREGISTER_TEAM = apiUrl + "/tournaments/unregister/";
export const GET_SCHEDULE = apiUrl + "/tournaments/";
export const IS_REGISTERED = apiUrl + "/tournaments/";
export const GET_MATCHES = apiUrl + "/tournaments/brackets/";
export const CHECK_IN = apiUrl + "/tournaments/brackets/";
export const SEND_PROOF = apiUrl + "/tournaments/brackets/";
export const RAISE_TICKET = apiUrl + "/tournaments/brackets/";
export const RAISE_TICKET_BATTLEROYALE = apiUrl + "/tournaments/";
export const GET_LEADERBOARD = apiUrl + "/tournaments/leaderboard/";
//todo:- /api/verify/email/again
