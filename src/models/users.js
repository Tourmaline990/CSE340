import db from "./db.js";
import bcrypt from 'bcrypt'

const createUser = async(name,email,password_hash) => {
    const default_role  = 'user';
    const query = `
     INSERT INTO users 
     (name,email,password_hash,role_id)
     VALUES
     ($1,$2,$3,(SELECT role_id FROM roles WHERE role_name = $4))
     RETURNING user_id
    `
    const queryParams = [name,email,password_hash,default_role]
    const result = await db.query(query,queryParams)
    if(result.rows.length === 0){
       throw new Error("failed to create new user")
    }
    if(process.env.ENABLE_SQL_LOGGING === "true"){
         console.log("created new user with ID:",result.rows[0].user_id)
    }
    return result.rows[0].user_id;
}
const findUserByEmail = async(email) => {
    const query = `
       SELECT user_id,name,email,password_hash,role_name
       FROM users
       JOIN roles ON users.role_id = roles.role_id
       WHERE email = $1
    `
    const queryParams = [email]
    const result = await db.query(query,queryParams)
    if(result.rows.length === 0){
          return null;
    }
    return result.rows[0];
}

const verifyPassword = async(password,passwordHash) => {
  return  bcrypt.compare(password,passwordHash)
}

const authenticateUser = async(email,password) => {
    const user = await findUserByEmail(email)
    if(!user){
      return user;
    }
    if(verifyPassword(password,user.password_hash)){
         const {password_hash, ...userWithoutHash} = user;
         console.log(userWithoutHash);
         return userWithoutHash;
        }
    return user;
}

export {createUser,authenticateUser}