const User = require('../app/models/user')

module.exports = class userService {

    static async findUserAll(){
        try {
            
            return await User.find()

        } catch (error) {
            console.log(`/services/userService: error -> findUserAll <<${error}>>`)
            throw {
                error: "Error ao listar todos os usuarios"
            }
        }
    }

    static async findUserId(id) {
        try {
            
            return await User.findById(id)

        } catch (error) {
            console.log(`/services/userService: error -> findUserId <<${error}>>`)
            throw {
                error: "Error ao listar um usuario"
            }
        }
    }

    static async findUserOne(email) {
        try {

            return  await User.findOne({
                email,
              }).select("+password");

        } catch (error) {
            console.log(`/services/userService: error -> findUserOne <<${error}>>`)
            throw {
                error: "Nao foi possivel achar um usuario"
            }
        }
    }
    static async findUserToken(email) {
        try {

            return  await User.findOne({
                email,
              }).select("+passwordResetToken passwordResetExpires");

        } catch (error) {
            console.log(`/services/userService: error -> findUserToken <<${error}>>`)
            throw {
                error: "Nao foi possivel achar um usuario"
            }
        }
    }
    static async createUser(content) {
        try {

            return  await User.create(content)
               

        } catch (error) {
            console.log(`/services/userService: error -> createUser <<${error}>>`)
            throw {
                error: "Nao foi possivel criar um usuario"
            }
        }
    }

    static async updateUser(id, content) {
        try {
            
            return await User.findByIdAndUpdate(id, content)

        } catch (error) {
            console.log(`/services/userService: error -> updateUser <<${error}>>`)
            throw {
                error: "Error ao atualizar um usuario"
            }
        }
    }
    static async removeUser(id) {
        try {
            
            return await User.findByIdAndDelete(id)

        } catch (error) {
            console.log(`/services/userService: error -> removeUser <<${error}>>`)
            throw {
                error: "Error ao remover um usuario"
            }
        }
    }



}