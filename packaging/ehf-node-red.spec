## Basic Descriptions of this package
Name:       ehf-node-red
Summary:    Node-RED Customized for Extensible Hardware Framework
Version:		0.9.1
Release:    1
Group:      System/Libraries
License:    Custom
Source0:    %{name}-%{version}.tar.gz
Source1:		install_ehf-node-red.sh

# Required packages
# Pkgconfig tool helps to find libraries that have already been installed
BuildRequires:  libattr-devel
BuildRequires:	python
BuildRequires:	which
BuildRequires:  node
BuildRequires:  pkgconfig(glib-2.0)

## Description string that this package's human users can understand
%description
Node-RED Customized for Extensible Hardware Framework

## Preprocess script
%prep
%setup -q

## Build script
%build

## Install script
%install
mkdir -p $RPM_BUILD_ROOT/usr/share/%{name}
mkdir -p $RPM_BUILD_ROOT/usr/bin/
ls $RPM_SOURCE_DIR
cp -Rp $RPM_SOURCE_DIR/%{name}-%{version}.tar.gz $RPM_BUILD_ROOT/usr/share/%{name}/%{name}.tar.gz
cp -Rp $RPM_SOURCE_DIR/install_ehf-node-red.sh $RPM_BUILD_ROOT/usr/bin/install_ehf-node-red.sh

# install license file
mkdir -p %{buildroot}/usr/share/license
cp LICENSE %{buildroot}/usr/share/license/%{name}

## Postprocess script
%post 

## Binary Package: File list
%files
%manifest ehf-node-red.manifest
/usr/share/%{name}/%{name}.tar.gz
/usr/share/license/%{name}
/usr/bin/install_ehf-node-red.sh
