import React from 'react';
import './App.css';

class RmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rmListBodyItems: []
    }

    this.handleAddRmListBodyItem = this.handleAddRmListBodyItem.bind(this);
  }

  handleAddRmListBodyItem() {
    this.setState({rmListBodyItems: this.state.rmListBodyItems.concat(
      <RmListbodyItem></RmListbodyItem>
    )});
  }

  render() {
    console.log(this.props.selectedRmListMenuItem);
    let title;
    if (this.props.selectedRmListMenuItem === null) {
      title = "select reminders menu";
    } else {
      title = this.props.selectedRmListMenuItem.props.title;
    }
    return (
      <div className="rm-list">
        <div className="rm-list-header">
          {title}
        </div>
        <div className="rm-list-body">
          {this.state.rmListBodyItems}
        </div>
        <div className="rm-list-footer" onClick={() => this.handleAddRmListBodyItem()}>
          Add Reminder
        </div>
      </div>
    );
  }
}

class RmListbodyItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false,
      title: "title"
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({isCompleted: !this.state.isCompleted});
  }

  isCompletedClass() {
    return this.state.isCompleted ? "is-completed" : "";
  }

  render() {
    return(
      <div className="rm-list-body-item">
        <div className={`rm-list-body-item-task-icon ${this.isCompletedClass()}`}
          onClick={() => this.handleClick()}>
        </div>
        <div className="rm-list-body-item-content">
          <div className="rm-list-body-item-content-title">{this.state.title}</div>
          <div className="rm-list-body-item-content-border"></div>
        </div>
      </div>
    ); 
  }
}

class RmListMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  getTitle() {
    return this.props.title;
  }

  isSelectedClass() {
    return this.state.isSelected ? "is-selected" : "";
  }

  handleClick() {
    this.setState({isSelected: !this.state.isSelected});
  }
  
  render() {
    return (
      <div className={`rm-list-menu-item ${this.isSelectedClass()}`}
        onClick={() => {
          this.handleClick();
          this.props.onSelectedRmListMenu(this);
        }
      }>
        <div className="rm-list-menu-item-content">{this.props.title}</div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      selectedRmListMenuItem: null,
      rmListMenuItems: []
    }

    this.handleAddList = this.handleAddList.bind(this);
    this.handleSelectedRmListMenuItem = this.handleSelectedRmListMenuItem.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/reminders/user/jinbeom@samsung.com/list")
      .then(res => res.json())
      .then(
        (result) => {
          for (const rmListMenuItem of result) {
            this.setState({rmListMenuItems: this.state.rmListMenuItems.concat(
              this.getRmListMenuItemComponent(rmListMenuItem.rmListId, rmListMenuItem.rmListTitle)
            )});
          }
          
          if (this.state.rmListMenuItems.length) {
            console.debug(this.state.rmListMenuItems);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getRmListMenuItemComponent(id, title) {
    /**
     * TODO : 새로운 리스트를 추가하는 프로세스에 대해서 고민 할 필요성이 있음.
     * 현재 생각나는 프로세스는 다음과 같음.
     * 1. 서버에 새로운 리스트 추가 요청
     * 2. 서버에서 새로운 리스트에 대한 값을 응답.
     * 3. 응답받은 값을 렌더링
     * 위의 방법은 서버와 실시간 소통을 해야함으로 클라이언트가 느끼는 경험은 좋지 않을 수 있다.
     * 두 번째 방법은 임의의 값으로 id를 설정 (UUID)을 한 후 진행
     * 서버에서는 해당 id를 후처리를 통해 처리
     */
    return (
      <RmListMenuItem key={id} id={id} title={title} onSelectedRmListMenu={this.handleSelectedRmListMenuItem}></RmListMenuItem>
    );
  }

  handleSelectedRmListMenuItem(rmListMenuItem) {
    console.debug(this.state.selectedRmListMenuItem);

    if (this.state.selectedRmListMenuItem !== null) {
      this.state.selectedRmListMenuItem.handleClick();
    }

    if (this.state.selectedRmListMenuItem === rmListMenuItem) {
      this.setState({selectedRmListMenuItem: null});
      return;
    }

    this.setState({selectedRmListMenuItem: rmListMenuItem});
  }

  handleAddList() {
    this.setState({rmListMenuItems: this.state.rmListMenuItems.concat(
      this.getRmListMenuItemComponent(undefined, "New List")
    )});
  }

  render() {
    return (
      <div className="root-view">
        <div className="rm-toolbar">
          <div className="logo">ICloud Reminders</div>
          <div className="gnb">김진범</div>
        </div>
        <div className="main-view">
          <div className="sidebar">
            <div className="scrollable-area">
              <div className="rm-list-menu">
                {this.state.rmListMenuItems}
              </div>
            </div>
            <div className="sidebar-footer" onClick={() => this.handleAddList()}>
              Add List
            </div>
          </div>
            <RmList selectedRmListMenuItem={this.state.selectedRmListMenuItem}></RmList>
        </div>
      </div>
    );
  }
}

export default App;