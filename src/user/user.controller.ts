import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('user')
export class UserController {
  constructor(private authorizationService: UserService) {}

  //post request for signup
  @Post('/signup')
  signUp(
    @Body(ValidationPipe)
    userCredentialsDto: UserCredentialsDto,
  ): Promise<void> {
    return this.authorizationService.signUp(userCredentialsDto);
  }

  //post request for signin
  @Post('/login')
  logIn(
    @Body(ValidationPipe)
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accesToken: string }> {
    return this.authorizationService.logIn(userCredentialsDto);
  }
}
