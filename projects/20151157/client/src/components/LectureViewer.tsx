import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer';
import List, { ListItem, ListItemText } from '@material/react-list';
import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface LectureViewerProps {
  title: string;
  file: string;
}

class LectureViewer extends Component<LectureViewerProps> {
  state = {
    numPages: null,
    pageNumber: 1,
    selectedIndex: 0,
  }

  onDocumentLoadSuccess = ({ numPages }: { numPages: string }) => {
    this.setState({ numPages });
  }

  setPage = (page: number) => {
    this.setState({ pageNumber: page })
  }

  render() {
    const { pageNumber, numPages, selectedIndex } = this.state;
    const { title, file } = this.props;

    return (
      <div className='drawer-container'>
        <Drawer>
          <DrawerHeader>
            <DrawerTitle tag='h2'>
              {title}
            </DrawerTitle>
          </DrawerHeader>

          <DrawerContent>
            <List singleSelection selectedIndex={selectedIndex}>
              {Array.from(Array(numPages).keys()).map((_, idx) => (
                <ListItem key={idx} onClick={this.setPage.bind(this, idx + 1)}>
                  <ListItemText primaryText={`Page ${idx + 1}`} />
                </ListItem>
              ))}
            </List>
          </DrawerContent>
        </Drawer>
        <DrawerAppContent className='drawer-app-content'>
          <Document
            file={file}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={1024} />
          </Document>
        </DrawerAppContent>
      </div>
    );
  }
}

export default LectureViewer;
