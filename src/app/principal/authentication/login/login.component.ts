import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  usuario: string='';
password: string= '';

constructor(private authService: AuthService, private router: Router){}

login(): void{
  this.authService.login(this.usuario, this.password).subscribe({
    next: () => this.router.navigate(['/dashboard']),
    error: (err) => console.error('Fallo el logeo ', err)
  })
}


}
