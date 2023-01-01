import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  userEmail: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        let jsonResult = JSON.parse(JSON.stringify(res));
        this.userDetails = jsonResult.user;
        localStorage.setItem('user-details', jsonResult.user.email);
        
        let user = localStorage.getItem('user-details');
        this.userEmail = user; 
      }, 
      err => { 
        console.log(err);
        
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  openDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
}
