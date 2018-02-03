import { Component, OnInit, Input, OnDestroy, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PostService } from "../../../services/services";
import { Story, Poll } from '../../../models/models';
/*Import EmitterService*/
import { EmitterService } from '../emitter/emitter.component';
declare var tinymce: any;
declare var swal: any;

@Component({
  selector: 'app-post-poll-map',
  templateUrl: './post-poll-map.component.html',
  styleUrls: ['./post-poll-map.component.scss']
})

export class PostPollMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() post                   = false;
  @Input() poll                   = false;
  @Input() map                    = false;
  @Input() story                  = false;
  @Input() full                   = false;
  @Input() elementId              : String;
  @Output() onEditorKeyup         = new EventEmitter<any>();

  editor;
  newpost     = {};
  newpoll     : Poll = new Poll();
  newstory    : Story = new Story();
  errorMessage: any;
  private  _isDisabled = false;
  private _postSaveEmitterService = EmitterService.get('postSaveEmitter');
  constructor(private _postservice: PostService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#share-story-textarea',
      plugins: ['link', 'paste'],
      max_height: 300,
      menubar: false,
      toolbar: "bold italic save attach",
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.addButton('attach', {
          text: false,
          icon: 'upload',
          onclick: function() {
            var fileToUpload = $('form.share-story').find('input.fileToUpload');
            fileToUpload.click();
            fileToUpload.bind('change', function() {
              var str = 'File: ' + fileToUpload.val().toString();
              if (str.length > 22) {
                var str_start = str.substr(0, 12) + '...';
                str = str_start + str.substr(16, 22);
              }

              $('form.share-story').find("span#file_text").html(str);
              $('form.share-story').find('button.clear_file').removeClass('hidden');
            });
          }
        });
        editor.addButton('save', {
          text: 'SHARE',
          icon: false,
          onclick: function() {
            $('form.share-story').submit();
          }
        });
        editor.on('init', function(evt) {
          var toolbar = $(evt.target.editorContainer)
            .find('>.mce-container-body >.mce-top-part');
          var editor = $(evt.target.editorContainer)
            .find('>.mce-container-body >.mce-edit-area');

          // switch the order of the elements
          toolbar.detach().insertAfter(editor);

          this.dom.setStyle(this.dom.select('body'), 'background-color', '#f9f9f9');

          if (this.getContent() == '') {
            this.setContent("<p id='placeholder' style='color: #989898;'>Tell your story...</p>");
          }
        });
        editor.on('focus', function() {
          this.dom.remove(this.dom.select('p#placeholder'));
        });
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  postLink(e) {
    $('.create-poll, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-post, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest("li").addClass('active');
  }

  brainLink(e) {
    $('.create-post, .create-poll, .timeline-block, .ask-question').hide();
    $('.brain-map').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  pollLink(e) {
    $('.create-post, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-poll, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  shareStoryLink(e) {
    $('.create-post, .brain-map, .ask-question, .create-poll').hide();
    $('.share-story').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  addPoll() {
    const currentchildren = $('.poll-option').children().length;
    if (currentchildren < 4) {
      const poll = `
        <li>
          <input type="text" placeholder="Add an option" />
        </li>`;
      $('.poll-option').append(poll);
    } else {
      //alert("Maximum of 4 options are permitted");
      this.errorMessage = "Maximum of 4 options are permitted";
    }

  }

  createpoll() {
    let options = [];
    $('.poll-option >> :input').each(function(a, b) {
      options.push($(b).val());
    });
    //this.newpoll["name"] = $("#newpoll_name").val();
    this.newpoll['options'] = options;
    //this.newpoll["timeLimit"] =1;
    this._postservice.createpoll(this.newpoll).subscribe(resp => {
      //console.log(resp);
      if (resp['error'] === false) { alert(resp['Message']) }
      else { console.log(resp); }
    }, error => {
      console.log(error);
    });
  }

  createpost() {
    /*Disable post button after submit to prevent post duplication*/
    this._isDisabled = true;
    if ($('.create-pots-textarea').val() === '') {
      swal('Oops','Empty Content', "error");
      this._isDisabled = false;
    } else {
      this._postservice.createpost(this.newpost["message"]).subscribe((response : any) => {
          swal('Sucess', "Post Created Successfully", "success");
          $('.create-pots-textarea').val('');
          this._isDisabled = false;
          this._postSaveEmitterService.emit(response.postId);
      }, error => {
        this._isDisabled = false;
        if (error['error'].body) {
          swal('Oops', error['error'].body.status_message, 'error')
        } else {
          swal('Oops', error['error'].status_message, 'error')
        }
      });
    }
  }

  addstory() {
    this._postservice.createstory(this.newstory).subscribe((resp) => {
      console.log(resp);
    });
  }

  clearFile() {
    // $('form.share-story').find('input.fileToUpload').val('')
    // $('form.share-story').find("span#file_text").html('');
    // $('form.share-story').find('button.clear_file').addClass('hidden');
  }
}
