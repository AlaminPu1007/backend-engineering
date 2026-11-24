import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

const userData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com'
    }
]

@Controller('user')
export class UserController {
    // @Get()
    // getUser() {
    //     return userData;
    // }

    // get data by using query params
    @Get()
    getUserByQuery(@Query('name') name: string) {

        if (name) {
            const user = userData.find(user => user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            if (user) {
                return user;
            } else {
                return { message: 'User not found' };
            }
        }

        return { message: 'Please provide a name query parameter' };

    }

    // Get users by params using id
    @Get(":id")
    getUserById(@Param('id') id: number | string) {

        if (!id.toString().match(/^\d+$/)) {
            return { message: 'Please provide a valid id' };
        }

        const user = userData.find(i => Number(i.id) === Number(id));

        if (user) {
            return user;
        } else {
            return { message: 'User not found' };
        }
    }

    // create users
    @Post()
    createUser(@Body() CreateUserDtoData: CreateUserDto) {

        // destruct data from body
        const { name = "", email = "" } = CreateUserDtoData || {}

        // check unique users by their email
        const user = userData.find(i => i.email === email)

        if (user) {
            return {
                status: false,
                statusCode: 409,
                data: null,
                message: "This user is already exist."
            }
        }

        // update user-data
        userData.push({
            id: userData.length + 1,
            name,
            email
        })

        return {
            status: true,
            statusCode: 201,
            data: CreateUserDtoData,
            message: "User create successfully!"
        }
    }

    // update users
    @Put(":id")
    updateUser(@Param('id') id: number | string, @Body() UpdateUserDtoData: UpdateUserDto) {

        // destruct data from body
        const { name = "", email = "" } = UpdateUserDtoData || {}

        // check unique users by their email
        const user = userData.find(i => Number(i.id) === Number(id))
        // console.log(id, 'id')

        // console.log("user", user);
        // console.log("UpdateUserDtoData", UpdateUserDtoData);

        if (!user) {
            return {
                status: false,
                statusCode: 404,
                data: null,
                message: "This user is not exist."
            }
        }

        userData.forEach((i) => {
            if (Number(i.id) === Number(id)) {
                i.name = name;
                i.email = email || i.email
            }
        })

        return {
            status: true,
            statusCode: 201,
            data: userData,
            message: "User updated successfully!"
        }
    }
}
