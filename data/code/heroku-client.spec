# This is a sample spec file for dict-wn
%define _topdir 	/home/sumit/rpmbuild/
%define name 		heroku-client
%define release 	el6
%define version		1.0
%define buildroot %{_topdir}/%{name}-%{version}-root

BuildRoot: %{buildroot}
Summary:	heroku-client a command line interface for accessing heroku services
License:	GPL
Name:		%{name}
Version:	%{version}
Release:	%{release}
#Source:		%{name}-%{version}.tar.gz
Prefix:		/usr
Group:		Development/Tools
%description
heroku-client is a command line interface for accessing heroku services. 

#%prep
#%setup -q

#%build
#./configure
#make

#%install
#make install prefix=$RPM_BUILD_ROOT/usr

%files
%defattr(-,root,root)
/usr/local/heroku-client
 

#%doc %attr(0444,root,root) /usr/local/share/man/man1/rvm.1

%post
echo "export PATH 
PATH="/usr/local/heroku/bin:$PATH"">>/home/sumit/.bash_profile

source /home/sumit/.bash_profile
