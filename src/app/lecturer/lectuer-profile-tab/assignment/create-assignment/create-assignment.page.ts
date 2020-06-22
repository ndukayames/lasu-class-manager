import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.page.html',
  styleUrls: ['./create-assignment.page.scss'],
})
export class CreateAssignmentPage implements OnInit {
  course_code;course_title;course_data:any[];selected_course:string;
  constructor(private prvdr:ProviderService,private imagePicker: ImagePicker) {
   }

  async ngOnInit() {
    const stripped = '    My String With A    Lot Whitespace  '.replace(/\s+/g, '')
    this.course_data = await this.prvdr.storage.get('unique_lecturers_courses')
    
      console.log(stripped)
  }
  myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }
  async getTitle(selected_course:HTMLInputElement){
    let dat = this.course_data.find(res=>{
      console.log(selected_course.value,selected_course.value.trim())
      // selected_course.trim()
      return res.course_code === selected_course.value.trim()
    })
    const {course_title,course_code} = dat
    this.course_title = course_title
    this.course_code = course_code
    console.log(this.course_title)
  }
  uploadFile() {
    let options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 15,
      
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      // width: int,
      // height: int,
      
      // quality of resized image, defaults to 100
      // quality: int (0-100),
  
      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      // outputType: int
  };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }
}

