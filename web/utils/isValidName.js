/**
 * Created by dandan.wu on 16/9/13.
 */
const  validNameReg = /^[a-zA-Z]/;

export default (name) => {
    return validNameReg.test(name);
}
