import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  @Output() contentChange = new EventEmitter<string>(); // Emit content change
  @Input() label: string = ''; // Accept label as input
  @Input() initialContent: string = ''; // Accept initial content as input

  private editor: any; // Store a reference to the editor
  public previewContent: string = ''; // Property to hold the preview content

  ngOnInit(): void {
    // Initialization logic can remain here if needed
  }

  ngAfterViewInit(): void {
    this.initializeEditor(); // Initialize the editor after the view is fully initialized
  }

  initializeEditor() {
    this.editor = new (window as any).RichTextEditor(this.editorContainer.nativeElement);

    // Set initial content if provided
    if (this.initialContent) {
      console.log(this.initialContent,"initialcontent from rich text")
      this.editor.setHTMLCode(this.initialContent);
    }

    const iframeDocument = this.editor.getDocument(); // Access the document inside the iframe
    if (iframeDocument) {
      const observer = new MutationObserver(() => {
        const content = this.editor.getHTMLCode();
        console.log('Detected content mutation:', content);
        this.previewContent = content;
        this.contentChange.emit(content);
      });

      // Start observing the body inside the iframe for changes
      observer.observe(iframeDocument.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    } else {
      console.error('Failed to access the iframe document');
    }
  }
}
