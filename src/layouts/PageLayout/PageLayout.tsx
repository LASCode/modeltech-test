import cnBind from 'classnames/bind';
import styles from './PageLayout.module.scss';
import {PageLayoutProps} from "./PageLayout.types";
import {FetchStatus} from "types/request.types";
import {ModalServerError} from "components/ModalServerError/ModalServerError";
import {noop} from "chart.js/helpers";
import {Suspense} from "react";
import {isLoading} from "utils/isLoading";
const cx = cnBind.bind(styles);

export const PageLayout = ({
   children,
   status = FetchStatus.FULFILLED,
   onRetry = noop,
   skeleton,
   errorMessage
}: PageLayoutProps) => {

    return (
        <div className={cx('page-layout')}>
            <main className={cx('content')}>
                <div className={cx('content-absolute')}>
                    <div className={cx('content-inner')}>
                        {isLoading(status)
                            ? (<Suspense fallback={skeleton} />)
                            : (
                                <>
                                    {children}
                                    <ModalServerError
                                        onRetry={onRetry || noop}
                                        isOpen={status === FetchStatus.REJECTED}
                                        onClose={noop}
                                        message={errorMessage}
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    );
};