import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProviderService } from 'src/app/shared/provider.service';
import { File } from '@ionic-native/file/ngx';
import { Camera,CameraOptions, PictureSourceType, DestinationType } from '@ionic-native/camera/ngx'
import { ActionSheetController, IonInput, Platform } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.page.html',
  styleUrls: ['./create-assignment.page.scss'],
})
export class CreateAssignmentPage implements OnInit {
  course_code;
  course_title;
  course_data:any[];
  selected_course:string;
  imagePath;imageURL
  imgInput;
  assignment_title;
  assignment_content;
  level_for;
  due_date;
  assignment_url;
  start_date

  @ViewChild('imgfile',{static:false}) imgFile:IonInput
  constructor(private prvdr:ProviderService,private camera: Camera, public actionSheetController: ActionSheetController,private file: File,private ref: ChangeDetectorRef, private filePath: FilePath, private platform:Platform) {
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
  
  clearImg(){
    this.imageURL = false
    console.log(this.imgFile.value)
    this.imgFile.value = ''
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}
takePicture(sourceType: PictureSourceType) {
  var options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };

  this.camera.getPicture(options).then(imagePath => {
    this.imageURL = 'data:image/jpeg;base64,' + imagePath
  });
  }
  submitAssignment(){
    if(!this.course_title || !this.course_code || !this.assignment_content || !this.assignment_title || !this.level_for || !this.due_date){
      this.prvdr.doToast('some fields are empty','middle',3000)
      console.log(this.course_code,this.course_title,this.assignment_title,this.assignment_content,this.due_date,this.level_for)
    }else{
      this.start_date = new Date();
      this.prvdr.uploadAssignmentService(this.course_code,true,1233,this.imageURL,this.assignment_content,this.assignment_url,this.start_date,this.due_date,this.level_for)
    }
  }
}
