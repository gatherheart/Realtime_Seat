import classnames from 'classnames';
import _ from 'lodash';
import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { connect } from 'react-redux';
import { DraftJsEditor } from '../../common/components/DraftJsEditor';
import { numWithCommas, OpType } from '../../common/utils';
import { updateModals } from '../../redux/actions';
import './DesktopDetail.scss';
interface Props {
  packageItem: any;
  dUpdateModals: (opType: OpType, query: any) => any;
}
interface State {
  tab: number;
  selectedType: string;
}

class DesktopDetail extends React.Component<Props, State> {
  public static async getInitialProps({ store }) {}

  public state = {
    tab: 0,
    selectedType: ''
  };

  public componentWillReceiveProps(nextProps) {
    const types = _.get(nextProps, 'packageItem.structure.types');
    if (types.length > 0) {
      this.setState({ selectedType: types[0].title });
    }
  }

  public render() {
    const { packageItem } = this.props;
    const selectedType = packageItem.structure.types.find(
      it => it.title === this.state.selectedType
    ) || { title: '', categories: [], payment: 0, discount: 0 };

    return (
      <section>
        <div className="container desktop">
          <div className="left-panel">
            <div className="title">
              <h3>{packageItem.structure.title}</h3>
              <p>{packageItem.structure.summary}</p>
            </div>
            <div className="material">
              <div className="tab-wrap">
                <button
                  className={classnames({ active: this.state.tab === 0 })}
                  onClick={() => this.setState({ tab: 0 })}
                >
                  패키지
                </button>
                <button
                  className={classnames({ active: this.state.tab === 1 })}
                  onClick={() => this.setState({ tab: 1 })}
                >
                  성공사례
                </button>
              </div>
              <div className="content">
                <img
                  src={
                    packageItem.structure.imgLink.length > 0
                      ? packageItem.structure.imgLink
                      : 'https://elitescreens.com/images/product_album/no_image.png'
                  }
                />
                <DraftJsEditor editorState={this.getEditorState()} />
              </div>
            </div>
          </div>
          <div className="right-desktop-panel">
            <div className="services-wrap">
              <div className="type-options">
                <label>유형선택</label>
                <Dropdown
                  className="dropdown"
                  options={packageItem.structure.types.map(it => ({
                    value: it.title,
                    label: it.title
                  }))}
                  onChange={it => this.setState({ selectedType: it.value })}
                  value={this.state.selectedType}
                />
              </div>
              <div className="package-detail">
                <label>패키지구성</label>
                <ul>
                  {selectedType.categories.map((it, index) => (
                    <li key={`type-categories-${it.title}-${index}`}>
                      <div className="category-title">
                        <span>&#10003;</span>
                        <p>{it.title}</p>
                      </div>
                      <div className="category-items">
                        {it.items.map((str, index) => (
                          <p
                            key={`category-item-${str}-${index}`}
                          >{`- ${str}`}</p>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="calcs-wrap">
              <div className="discount">
                <p>할인금액</p>
                <div>
                  <p>{numWithCommas(selectedType.payment)}</p>
                  <p>{`- ${numWithCommas(selectedType.discount)}`}</p>
                </div>
              </div>
              <div className="total">
                <p>결제금액</p>
                <p>
                  {numWithCommas(selectedType.payment - selectedType.discount)}
                </p>
              </div>
              <button
                onClick={() => {
                  this.setState({ isDrawerOpen: false });
                  this.props.dUpdateModals('set', {
                    'campaignFormModal.isOpen': true,
                    'campaignFormModal.content.customerComment': `${
                      packageItem.structure.title
                    } - ${this.state.selectedType} 상담 신청합니다`
                  });
                }}
              >
                상담 예약하기
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  private getEditorState = () => {
    const isDesktop = this.props.device === 'DESKTOP';
    const isDetail = this.state.tab === 0;
    if (isDesktop && isDetail) {
      return this.props.packageItem.desktop.detail;
    } else if (isDesktop) {
      return this.props.packageItem.desktop.success;
    } else if (isDetail) {
      return this.props.packageItem.mobile.detail;
    } else {
      return this.props.packageItem.mobile.success;
    }
  };
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  dUpdateModals: (opType: OpType, query: any) =>
    dispatch(updateModals(opType, query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopDetail);
