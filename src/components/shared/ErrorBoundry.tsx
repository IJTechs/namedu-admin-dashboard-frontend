import { Component, ReactNode } from 'react';
import { ComponentType } from 'react';
import { useLocation, Location } from 'react-router-dom';
import { Button } from './Button';
interface ErrorBoundaryProps extends WithRouterProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: string;
}

export interface WithRouterProps {
  location: Location;
}

export const GetRouterLocation = <P extends WithRouterProps>(
  OriginalComponent: ComponentType<P>
): ComponentType<Omit<P, 'location'>> => {
  const NewComponent = (props: Omit<P, 'location'>) => {
    const location = useLocation();

    return <OriginalComponent {...(props as P)} location={location} />;
  };

  return NewComponent;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error.message };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error: error.message });
  }
  handleNavigateHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-primary-background w-full h-screen flex flex-col items-center justify-center text-black">
          <div className="text-center text-xl  space-y-7">
            <p>
              Yuzaga kelgan noqulayliklar uchun uzr so&apos;raymiz. <br />{' '}
              Xatolik tez orada bartaraf etiladi.
            </p>
            <Button
              variant="outline"
              className="border-secondary-background text-secondary-background"
              onClick={this.handleNavigateHome}
            >
              Bosh sahifaga qaytish
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default GetRouterLocation(ErrorBoundary);
