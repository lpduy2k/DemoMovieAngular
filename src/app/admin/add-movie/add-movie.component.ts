import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  form: FormGroup = new FormGroup({
    tenPhim: new FormControl(""),
    biDanh: new FormControl(""),
    trailer: new FormControl(""),
    hinhAnh: new FormControl(""),
    moTa: new FormControl(""),
    ngayKhoiChieu: new FormControl(""),
  })
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
  }

  handleChangeFile(evt: any) {
    console.log(evt)
    const file = evt.target.files[0];
    // this.form.setValue({}) : thay đổi toàn bộ giá trị trong form
    this.form.patchValue({hinhAnh: file}); // thay đổi 1 or nhiều
  }

  handleSubmit() {
    this.movieService.addMovie(this.form.value).subscribe()
  }

}
