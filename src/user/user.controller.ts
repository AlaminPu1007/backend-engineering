import { Controller, Get, Query } from '@nestjs/common';

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
}
